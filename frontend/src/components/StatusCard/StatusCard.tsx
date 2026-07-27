type StatusCardProps = {
	title: string
	value: string
	status: 'success' | 'warning' | 'error'
}

const statusDotClassMap: Record<StatusCardProps['status'], string> = {
	success: 'bg-green-500',
	warning: 'bg-yellow-400',
	error: 'bg-red-500',
}

function StatusCard({ title, value, status }: StatusCardProps) {
	return (
		<section className="w-full rounded-xl bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="text-sm text-gray-500">{title}</p>
					<p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
				</div>
				<span
					className={`mt-1 inline-block h-3 w-3 shrink-0 rounded-full ${statusDotClassMap[status]}`}
					aria-label={`${status} status`}
				/>
			</div>
		</section>
	)
}

export default StatusCard
